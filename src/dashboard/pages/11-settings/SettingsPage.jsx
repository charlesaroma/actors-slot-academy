import { useState } from "react"
import { motion } from "motion/react"
import { User, Lock, Bell, Shield, LogOut, Save } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"

export default function SettingsPage() {
  const { logout, auth } = useAuth()
  const [profile, setProfile] = useState({
    name: auth?.user?.name ?? "Admin",
    email: auth?.user?.email ?? "admin@actorslotacademy.com",
    avatar: "",
  })
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" })
  const [notifications, setNotifications] = useState({
    newTalent: true,
    eventReminders: true,
    votingResults: false,
    weeklyDigest: true,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="font-headline text-2xl font-bold text-asa-text">Settings</h1>
        <p className="text-sm text-asa-muted mt-1">Manage your admin account and preferences.</p>
      </div>

      {/* Profile */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-asa-border bg-asa-surface p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <User className="h-5 w-5 text-asa-primary" />
          <h2 className="font-headline text-lg font-bold text-asa-text">Profile</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-mono text-[10px] text-asa-muted mb-1 block">Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="label-mono text-[10px] text-asa-muted mb-1 block">Email</label>
              <input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50 transition-colors"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background transition-all hover:bg-asa-primary-bright cursor-pointer"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </motion.section>

      {/* Password */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-asa-border bg-asa-surface p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <Lock className="h-5 w-5 text-asa-primary" />
          <h2 className="font-headline text-lg font-bold text-asa-text">Change Password</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="label-mono text-[10px] text-asa-muted mb-1 block">Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50 transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-mono text-[10px] text-asa-muted mb-1 block">New Password</label>
              <input
                type="password"
                value={passwords.newPass}
                onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="label-mono text-[10px] text-asa-muted mb-1 block">Confirm</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full rounded-lg border border-asa-border bg-asa-background px-3 py-2.5 text-sm text-asa-text outline-none focus:border-asa-primary/50 transition-colors"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg bg-asa-primary px-5 py-2.5 text-sm font-semibold text-asa-background transition-all hover:bg-asa-primary-bright cursor-pointer"
          >
            <Save className="h-4 w-4" />
            Update Password
          </button>
        </div>
      </motion.section>

      {/* Notifications */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-asa-border bg-asa-surface p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <Bell className="h-5 w-5 text-asa-primary" />
          <h2 className="font-headline text-lg font-bold text-asa-text">Notifications</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-asa-text group-hover:text-asa-primary transition-colors capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <div
                onClick={() => setNotifications({ ...notifications, [key]: !value })}
                className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${
                  value ? "bg-asa-primary" : "bg-asa-border"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    value ? "translate-x-4.5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </motion.section>

      {/* Danger Zone */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-asa-accent/30 bg-asa-accent/5 p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <Shield className="h-5 w-5 text-asa-accent" />
          <h2 className="font-headline text-lg font-bold text-asa-text">Danger Zone</h2>
        </div>
        <p className="text-sm text-asa-muted mb-4">Sign out of your admin account. You will need to log in again.</p>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-lg border border-asa-accent px-5 py-2.5 text-sm font-semibold text-asa-accent transition-all hover:bg-asa-accent/10 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </motion.section>

      {/* Toast */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-6 right-6 rounded-lg bg-emerald-500/90 px-5 py-3 text-sm font-semibold text-white shadow-xl"
        >
          Settings saved successfully
        </motion.div>
      )}
    </div>
  )
}
