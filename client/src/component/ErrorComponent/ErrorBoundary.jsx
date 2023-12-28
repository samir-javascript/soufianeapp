import './styles.css'
function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div className="error-styles">
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <button className='login-btn' onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
export default ErrorFallback  