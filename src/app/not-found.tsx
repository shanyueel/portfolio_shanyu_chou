/**
 * NotFound component that displays a 404 error message when a page is not found.
 */
export default function NotFound() {
  const funLines = [
    'echo "Oops! This page is 404 not found-ish"',
    'echo "404: This is not the page you are looking for!"',
    'echo "cd /dev/null # Page not found"',
    'echo "cat ~/nowhere # No such file or directory"',
    'echo "git checkout --the-missing-page"',
    'echo "rm -rf ./this-page # Already gone!"',
    'echo "curl -I /404 | grep not-found"',
    'echo "find . -name missing-page # 0 results"',
    'echo "ls ~/404 # Not found"',
    'echo "exit 404 # Page not found-ish"',
    'echo "// TODO: Implement this page"',
    'echo "¯\\_(ツ)_/¯ # 404 not found"',
  ]

  const randomLine = funLines[Math.floor(Date.now() % funLines.length)]

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl md:text-8xl font-extrabold text-secondary mb-2 select-none">404</div>
      <h1 className="text-xl md:text-2xl font-bold mb-2 text-dark dark:text-light">
        Page Not Found
      </h1>
      <p className="mb-6 font-mono text-base text-gray-500 dark:text-gray-400">$ {randomLine}</p>
      <a href="/">
        <button className="flex gap-1 items-center bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Back to Home
        </button>
      </a>
    </div>
  )
}
