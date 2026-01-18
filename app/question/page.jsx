"use client";
import React, { useState, useEffect } from "react";
import ElegantShape from "@/components/elegantShape";

const CountdownTimer = ({ durationInSeconds }) => {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

  useEffect(() => {
    const storedEndTime = localStorage.getItem("hackathon_end_time");
    let endTime;

    if (storedEndTime) {
      endTime = parseInt(storedEndTime, 10);
    } else {
      endTime = Date.now() + durationInSeconds * 1000;
      localStorage.setItem("hackathon_end_time", endTime.toString());
    }

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [durationInSeconds]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="text-[10px] text-[#e99b63] tracking-[0.3em] uppercase mb-3 font-black">
        Hack Timer Active
      </div>
      <div className="text-5xl font-mono font-bold text-white tabular-nums tracking-tight">
        {formatTime(timeLeft)}
      </div>
      <div className="w-full max-w-[240px] h-[3px] bg-white/5 mt-5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#656565] to-[#e99b63] transition-all duration-1000 shadow-[0_0_10px_rgba(233,155,99,0.5)]"
          style={{ width: `${(timeLeft / durationInSeconds) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    tableNumber: "",
    domain: "",
  });
  const [assignedTopic, setAssignedTopic] = useState(null);

  const topics = {
    "AI/ML": [
      "Generative Art Engine",
      "Predictive Traffic Flow",
      "Health-Bot AI",
      "Neural Style Transfer Tool",
    ],
    Web3: [
      "NFT Loyalty Wallet",
      "DAO Voting Tool",
      "DeFi Yield Tracker",
      "Decentralized Identity Manager",
    ],
    FullStack: [
      "SaaS Starter Kit",
      "Real-time Event Map",
      "Peer-to-Peer Marketplace",
      "Collaborative Code Editor",
    ],
    IoT: [
      "Smart Plant Monitor",
      "Home Security Node",
      "Energy Usage Tracker",
      "Warehouse Automation Bot",
    ],
  };

  // On mount, load stored assigned topic if exists
  useEffect(() => {
    const storedTopic = localStorage.getItem("assigned_topic");
    const storedForm = localStorage.getItem("form_data");
    if (storedTopic) setAssignedTopic(storedTopic);
    if (storedForm) setFormData(JSON.parse(storedForm));
  }, []);

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    localStorage.setItem("form_data", JSON.stringify(updatedData)); // persist form data
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const domainTopics = topics[formData.domain];
    const randomTopic =
      domainTopics[Math.floor(Math.random() * domainTopics.length)];
    setAssignedTopic(randomTopic);
    localStorage.setItem("assigned_topic", randomTopic); // persist assigned topic
    const endTime = Date.now() + (2 * 3600 + 30 * 60) * 1000;
    localStorage.setItem("hackathon_end_time", endTime.toString()); // reset/start timer
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-6 pt-32 bg-[#0a0a0a] overflow-hidden text-white pb-20" id="getstarted">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e99b63]/[0.08] via-[#1a1a1a] to-[#e99b63]/[0.12] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape delay={0.3} width={600} height={140} rotate={10} gradient="from-[#e99b63]/[0.8] to-[#ffcc8f]/[0.6]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-[#ffb87a]/[0.5] to-[#e99b63]/[0.4]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-[#ffb87a]/[0.55] to-[#e99b63]/[0.45]" className="left-[5%] md:left-[10%] bottom-[10%]" />
        <ElegantShape delay={0.6} width={220} height={60} rotate={20} gradient="from-[#ffcc8f]/[0.6] to-[#e99b63]/[0.45]" className="right-[10%] md:right-[20%] top-[10%]" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#e99b63]" />
          <span className="text-[10px] font-black tracking-[0.5em] text-white/80 uppercase">CODEX-BUILD</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#e99b63]" />
        </div>

        <div className="bg-[#0c0c0c]/90 border border-white/[0.08] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-8 md:p-10 backdrop-blur-xl">
          {!assignedTopic ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white tracking-tight">Initiate Build</h2>
                <p className="text-gray-500 text-sm mt-2">Enter details to unlock your challenge</p>
              </div>

              <div className="space-y-5">
                <div className="text-left">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Team Lead Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full mt-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#e99b63] focus:bg-white/[0.05] transition-all" placeholder="Enter name" />
                </div>

                <div className="text-left">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Station / Table</label>
                  <input type="number" name="tableNumber" required value={formData.tableNumber} onChange={handleChange} className="w-full mt-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#e99b63] focus:bg-white/[0.05] transition-all" placeholder="00" />
                </div>

                <div className="text-left">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Project Track</label>
                  <select name="domain" required value={formData.domain} onChange={handleChange} className="w-full mt-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#e99b63] focus:bg-white/[0.05] transition-all cursor-pointer">
                    <option value="" disabled>SELECT DOMAIN</option>
                    {Object.keys(topics).map((d) => <option key={d} value={d} className="bg-[#0c0c0c]">{d}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#e99b63] text-black font-bold py-4 rounded-xl hover:shadow-[0_0_25px_rgba(233,155,99,0.4)] active:scale-[0.98] transition-all uppercase tracking-widest text-xs mt-6">
                START BUILDING
              </button>
            </form>
          ) : (
            <div className="text-center py-4 animate-in fade-in zoom-in-95 duration-500">
              <CountdownTimer durationInSeconds={2 * 3600 + 30 * 60} />

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8 mt-2 shadow-inner">
                <p className="text-[10px] font-bold text-[#e99b63] uppercase tracking-[0.2em] mb-3">Target Project</p>
                <h3 className="text-2xl font-bold text-white leading-snug">{assignedTopic}</h3>
              </div>

              <div className="flex items-center justify-around bg-white/[0.03] rounded-lg py-3 px-4 border border-white/[0.05]">
                <div className="text-center">
                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Station</p>
                  <p className="text-white text-sm font-mono">#{formData.tableNumber}</p>
                </div>
                <div className="h-8 w-[1px] bg-white/10"></div>
                <div className="text-center">
                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Track</p>
                  <p className="text-white text-sm font-mono">{formData.domain}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/70 pointer-events-none" />
    </section>
  );
};

export default Page;
