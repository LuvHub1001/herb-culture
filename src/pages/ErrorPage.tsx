function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="text-5xl">🌀</div>
      <h1 className="text-2xl font-bold md:text-3xl">에러가 발생했어요</h1>
      <p className="text-sm text-[var(--text-muted)]">
        잠시 후 다시 시도해주세요.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-4 rounded-xl bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black"
      >
        새로고침
      </button>
    </div>
  );
}

export default ErrorPage;
