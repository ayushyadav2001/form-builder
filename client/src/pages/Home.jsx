function Home() {
  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Form Builder</h1>
      <p className="text-lg mb-4">
        Create dynamic forms, share them with anyone, and view responses in real-time.
      </p>
      <a href="/register" className="bg-blue-500 text-white px-6 py-3 rounded">
        Get Started
      </a>
    </div>
  );
}

export default Home;