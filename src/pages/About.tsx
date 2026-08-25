import React from 'react';
import { Target, Shield, HeartHandshake, Award } from 'lucide-react';

export function About() {
    return (
        <div className="w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8 box-border flex flex-col items-center">

            {/* Header section */}
            <div className="max-w-4xl w-full text-center mb-16 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                    About <span className="text-secondary-light">LifeNFT</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    The blockchain-powered platform where saving a life is permanently recognized. We’re bridging the gap between donors, hospitals, and the community.
                </p>
            </div>

            {/* Main Content Sections */}
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">

                {/* Mission */}
                <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-800/50 hover:border-red-900/40 transition-colors shadow-2xl">
                    <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                        <Target className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                    <p className="text-slate-400 leading-relaxed text-lg">
                        We aim to eradicate the sheer shortage of blood in critical healthcare infrastructure by supercharging the incentive model. By harnessing the immutable ledger of Web3, we ensure every drop given is honored.
                    </p>
                </div>

                {/* Vision */}
                <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-800/50 hover:border-red-900/40 transition-colors shadow-2xl">
                    <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                        <HeartHandshake className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">The Vision</h2>
                    <p className="text-slate-400 leading-relaxed text-lg">
                        A future where donors are celebrated globally. Our digital assets act as irreversible proofs-of-donation that seamlessly integrate into a broader ecosystem of exclusive real-world utility and rewards.
                    </p>
                </div>
            </div>

            {/* Value Pillars List */}
            <div className="max-w-6xl w-full">
                <h3 className="text-2xl font-bold text-center text-white mb-10">Platform Core Pillars</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-center flex flex-col items-center">
                        <Shield className="w-10 h-10 text-slate-300 mb-4" />
                        <h4 className="text-xl font-bold text-white mb-2">Immutable Security</h4>
                        <p className="text-slate-400 text-sm">Powered by Hive Blockchain, securing donor autonomy and identity.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-center flex flex-col items-center">
                        <Award className="w-10 h-10 text-slate-300 mb-4" />
                        <h4 className="text-xl font-bold text-white mb-2">NFT Certification</h4>
                        <p className="text-slate-400 text-sm">Tradeable, uniquely minted badges proving historic life-saving contributions.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-center flex flex-col items-center">
                        <HeartHandshake className="w-10 h-10 text-slate-300 mb-4" />
                        <h4 className="text-xl font-bold text-white mb-2">Hospital Integration</h4>
                        <p className="text-slate-400 text-sm">Verified on-site nodes confirming drops the moment they hit the bank.</p>
                    </div>

                </div>
            </div>

        </div>
    );
}
