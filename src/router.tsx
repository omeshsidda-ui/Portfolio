import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { syncDocumentHead } from './seo';

export function normalizePath(pathname: string): string {
  const withoutHashOrQuery = pathname.split(/[?#]/, 1)[0] || '/';
  const collapsed = withoutHashOrQuery.replace(/\/{2,}/g, '/');
  const withoutIndex = collapsed.endsWith('/index.html')
    ? collapsed.slice(0, -'/index.html'.length) || '/'
    : collapsed;
  if (withoutIndex.length > 1 && withoutIndex.endsWith('/')) {
    return withoutIndex.slice(0, -1);
  }
  return withoutIndex.startsWith('/') ? withoutIndex : `/${withoutIndex}`;
}

function splitHref(href: string): { targetPath: string; hash: string } {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) {
    return { targetPath: normalizePath(href), hash: '' };
  }
  const pathPart = href.slice(0, hashIndex) || '/';
  const hashPart = href.slice(hashIndex + 1);
  return { targetPath: normalizePath(pathPart), hash: hashPart };
}

function scrollToHash(hash: string) {
  const target = document.getElementById(hash);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    return true;
  }
  return false;
}

interface RouterContextValue {
  path: string;
  navigate: (href: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  path: '/',
  navigate: () => {},
});

export function RouterProvider({
  initialPath,
  children,
}: {
  initialPath?: string;
  children: ReactNode;
}) {
  const [path, setPath] = useState<string>(() =>
    normalizePath(
      initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/'),
    ),
  );
  const pendingScrollRef = useRef<{ type: 'top' | 'hash'; hash?: string } | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (typeof window === 'undefined' || !href.startsWith('/')) return;
      const { targetPath, hash } = splitHref(href);
      const nextUrl = hash ? `${targetPath}#${hash}` : targetPath;

      if (targetPath === path) {
        if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
          window.history.pushState(null, '', nextUrl);
        }
        if (hash) {
          scrollToHash(hash);
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        return;
      }

      window.history.pushState(null, '', nextUrl);
      pendingScrollRef.current = hash ? { type: 'hash', hash } : { type: 'top' };
      setPath(targetPath);
    },
    [path],
  );

  useEffect(() => {
    const onPopState = () => {
      const nextPath = normalizePath(window.location.pathname);
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        pendingScrollRef.current = { type: 'hash', hash };
      }
      setPath(nextPath);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    syncDocumentHead(path);

    const pending = pendingScrollRef.current;
    pendingScrollRef.current = null;
    if (!pending) return;

    if (pending.type === 'top') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    if (pending.type === 'hash' && pending.hash) {
      const targetHash = pending.hash;
      if (!scrollToHash(targetHash)) {
        window.requestAnimationFrame(() => {
          scrollToHash(targetHash);
        });
      }
    }
  }, [path]);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
}

export function Link({ href, onClick, target, download, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey ||
      target === '_blank' ||
      Boolean(download) ||
      !href.startsWith('/')
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  }

  return <a href={href} target={target} download={download} onClick={handleClick} {...rest} />;
}
