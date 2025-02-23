'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-500 to-blue-600">
      
      <header className="text-white text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
          Empowering Needy with Seamless Management
        </h1>
        <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-gray-200">
          Zee Welfare’s Beneficiary Management System ensures efficient registration, tracking, and assistance.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="mt-6 text-white bg-blue-600 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-800 transition"
        >
          Get Started Now
        </button>
      </header>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { title: "Admin", icon: "fas fa-user-cog", desc: "Manage users, departments, and generate insightful reports." },
            { title: "Receptionist", icon: "fas fa-user-plus", desc: "Register beneficiaries, assign tokens, and verify details." },
            { title: "Department Staff", icon: "fas fa-cogs", desc: "Track tokens, update assistance statuses, and provide help." }
          ].map((item, index) => (
            <div key={index} className="bg-green-50 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <i className={`text-4xl text-green-800 ${item.icon}`}></i>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h3 className="text-4xl font-bold text-green-800 mb-8">How It Works</h3>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            {[
              { step: "Step 1: Beneficiary Registration", desc: "Receptionists collect essential details and generate unique tokens for each department." },
              { step: "Step 2: Department Interaction", desc: "Department staff scans the token and assists the beneficiary, updating the status accordingly." }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                <h4 className="text-xl font-semibold text-green-600">{item.step}</h4>
                <p className="text-gray-700 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
