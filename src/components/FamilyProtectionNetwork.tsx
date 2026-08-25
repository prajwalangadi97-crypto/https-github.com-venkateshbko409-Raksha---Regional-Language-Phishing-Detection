import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  AlertTriangle,
  Send,
  Phone,
} from 'lucide-react';
import type { Language, FamilyMember, ThreatLevel } from '../types';
import { mockFamilyMembers } from '../mockData';

interface FamilyProtectionNetworkProps {
  language: Language;
}

export const FamilyProtectionNetwork: React.FC<FamilyProtectionNetworkProps> = ({
  language,
}) => {
  const [members, setMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Form state
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('Mother');
  const [newPhone, setNewPhone] = useState('+91-98XXX-XXXXX');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newMember: FamilyMember = {
      id: `f-${Date.now()}`,
      name: newName,
      relation: newRelation,
      phone: newPhone,
      riskLevel: 'LOW',
      isOnline: true,
    };

    setMembers([...members, newMember]);
    setNewName('');
    setShowAddModal(false);
  };

  const handleBroadcastAlert = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  const getRiskBadge = (level: ThreatLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'MEDIUM':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Users className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
              {language === 'kn'
                ? 'ಕುಟುಂಬ ಸಂರಕ್ಷಣಾ ಜಾಲ & ಸೀನಿಯರ್ ಕವಚ'
                : 'Family Protection Network & Senior Citizen Defense Mesh'}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            {language === 'kn'
              ? 'ನಿಮ್ಮ ಪೋಷಕರು ಮತ್ತು ಹಿರಿಯರಿಗೆ ಬರುವ ಅನುಮಾನಾಸ್ಪದ ಕರೆಗಳು ಮತ್ತು ಸಂದೇಶಗಳ ಮೇಲೆ ನಿಗಾ ಇರಿಸಿ, ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳನ್ನು ರವಾನಿಸಿ.'
              : 'Add elderly parents and relatives to remote threat relays, monitor suspicious SMS triggers, and broadcast emergency defense alerts.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
          >
            <UserPlus className="h-4 w-4" />
            <span>{language === 'kn' ? 'ಕುಟುಂಬದ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ' : 'Add Family Member'}</span>
          </button>

          <button
            type="button"
            onClick={handleBroadcastAlert}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:scale-105"
          >
            <Send className="h-3.5 w-3.5" />
            <span>
              {broadcastSent
                ? language === 'kn'
                  ? 'ಎಚ್ಚರಿಕೆ ರವಾನಿಸಲಾಗಿದೆ!'
                  : 'Alert Broadcasted!'
                : language === 'kn'
                ? 'ಕುಟುಂಬಕ್ಕೆ ತುರ್ತು ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ'
                : 'Broadcast Threat Warning'}
            </span>
          </button>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md transition-all hover:border-slate-700"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 font-bold text-slate-200 text-xs">
                    {member.name.charAt(0)}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{member.name}</h4>
                    <span className="text-[11px] text-slate-400">{member.relation}</span>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold ${getRiskBadge(
                    member.riskLevel
                  )}`}
                >
                  {member.riskLevel}
                </span>
              </div>

              <div className="mt-3 text-xs text-slate-400 font-mono flex items-center gap-1">
                <Phone className="h-3 w-3 text-slate-500" />
                <span>{member.phone}</span>
              </div>

              {member.lastAlert && (
                <div className="mt-3 rounded-xl border border-red-500/20 bg-red-950/20 p-2.5 text-[11px] text-red-300">
                  <div className="flex items-center gap-1 font-bold mb-0.5">
                    <AlertTriangle className="h-3 w-3 text-red-400" />
                    <span>Recent Suspicious Trigger:</span>
                  </div>
                  <span>{member.lastAlert}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-slate-400">
                <span
                  className={`h-2 w-2 rounded-full ${
                    member.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                  }`}
                />
                <span>{member.isOnline ? 'Kavacha Active' : 'Offline'}</span>
              </span>

              <span className="text-cyan-400 font-bold hover:underline cursor-pointer">
                Inspect Logs
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 mb-4">
              {language === 'kn' ? 'ಕುಟುಂಬದ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ' : 'Add Family Member to Protection Ring'}
            </h3>

            <form onSubmit={handleAddMember} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Name:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Amma, Grandpa"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Relation:</label>
                <select
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
                >
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Grandmother</option>
                  <option>Grandfather</option>
                  <option>Sibling</option>
                  <option>Spouse</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Mobile Phone:</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91-98XXX-XXXXX"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-slate-800 px-3.5 py-2 text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-cyan-500 px-4 py-2 font-bold text-slate-950 hover:bg-cyan-400"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
