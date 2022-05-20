import Link from 'next/link';

const Landing = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-teal-200 to-lime-200">
      <div class="flex items-center justify-center h-screen">
        <div class="bg-white text-black font-bold rounded-lg border shadow-lg p-10">
          <h1 className="text-center text-black text-3xl text-underline">
            PSV Tour Viewer 🐱‍👤
          </h1>
          <Link href="/tour-viewer">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
            >
              Go to the viewer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
