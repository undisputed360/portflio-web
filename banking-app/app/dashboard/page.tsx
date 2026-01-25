"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

type Section =
  | "about"
  | "cards"
  | "services"
  | "transfer"
  | "history"
  | "support"
  | "profile"
  | "settings";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("about");
  const [balance, setBalance] = useState(12500.75);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Deposit",
      amount: 5000,
      date: "2026-01-20",
      status: "completed",
    },
    {
      id: 2,
      type: "Withdrawal",
      amount: 2000,
      date: "2026-01-18",
      status: "completed",
    },
    {
      id: 3,
      type: "Transfer",
      amount: 1500,
      date: "2026-01-15",
      status: "completed",
    },
    {
      id: 4,
      type: "Payment",
      amount: 500,
      date: "2026-01-10",
      status: "completed",
    },
  ]);
  const [cards] = useState([
    {
      id: 1,
      number: "4532 •••• •••• 1234",
      holder: "Your Name",
      expiry: "12/26",
      status: "Active",
    },
    {
      id: 2,
      number: "5425 •••• •••• 5678",
      holder: "Your Name",
      expiry: "08/25",
      status: "Active",
    },
  ]);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [settings, setSettings] = useState({
    notifications: true,
    twoFactor: false,
    newsletter: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
    } else {
      requestAnimationFrame(() => {
        setHasMounted(true);
        setUser(JSON.parse(stored));
      });
    }
  }, [router]);

  if (!hasMounted) return null;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!recipient || isNaN(amt) || amt <= 0) {
      alert("Enter a valid recipient and amount");
      return;
    }
    if (amt > balance) {
      alert("Insufficient funds");
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      type: `Transfer to ${recipient}`,
      amount: amt,
      date: new Date().toISOString().split("T")[0],
      status: "completed",
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(balance - amt);
    setRecipient("");
    setAmount("");
    alert("Transfer successful!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>🏦</div>
          <div className={styles.sidebarTitle}>SecureBank</div>
        </div>

        <div className={styles.navItems}>
          <button
            className={`${styles.navItem} ${activeSection === "about" ? styles.active : ""}`}
            onClick={() => setActiveSection("about")}
          >
            <span>ℹ️</span> About Us
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "cards" ? styles.active : ""}`}
            onClick={() => setActiveSection("cards")}
          >
            <span>💳</span> Cards
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "services" ? styles.active : ""}`}
            onClick={() => setActiveSection("services")}
          >
            <span>🛠️</span> Services
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "transfer" ? styles.active : ""}`}
            onClick={() => setActiveSection("transfer")}
          >
            <span>💸</span> Transfer/Withdraw
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "history" ? styles.active : ""}`}
            onClick={() => setActiveSection("history")}
          >
            <span>📊</span> History
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "support" ? styles.active : ""}`}
            onClick={() => setActiveSection("support")}
          >
            <span>🎧</span> Support
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "profile" ? styles.active : ""}`}
            onClick={() => setActiveSection("profile")}
          >
            <span>👤</span> Me
          </button>
          <button
            className={`${styles.navItem} ${activeSection === "settings" ? styles.active : ""}`}
            onClick={() => setActiveSection("settings")}
          >
            <span>⚙️</span> Settings
          </button>
        </div>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Welcome back, {user?.email?.split("@")[0]}!</h1>
            <p>Manage your finances with ease</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.balance}>Total Balance</div>
            <div className={styles.balanceAmount}>
              ₦{balance.toLocaleString()}
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div
          className={`${styles.sectionContainer} ${activeSection === "about" ? styles.active : ""}`}
        >
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>About SecureBank</h2>
            <p className={styles.aboutText}>
              SecureBank is a modern digital banking platform dedicated to
              providing secure, fast, and convenient financial services to our
              customers. With cutting-edge technology and world-class security
              measures, we ensure your money is always safe.
            </p>
            <p className={styles.aboutText}>
              Our mission is to make banking accessible to everyone, anytime,
              anywhere. Whether you&apos;re managing personal finances or growing
              your business, we have the tools and expertise to support your
              financial goals.
            </p>
            <div className={styles.aboutFeatures}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔒</div>
                <div className={styles.featureTitle}>Bank-Level Security</div>
                <div className={styles.featureDesc}>
                  256-bit encryption and multi-factor authentication
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <div className={styles.featureTitle}>Lightning Fast</div>
                <div className={styles.featureDesc}>
                  Instant transfers and real-time balance updates
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🌍</div>
                <div className={styles.featureTitle}>Global Access</div>
                <div className={styles.featureDesc}>
                  Access your account from anywhere in the world
                </div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📱</div>
                <div className={styles.featureTitle}>Mobile First</div>
                <div className={styles.featureDesc}>
                  Fully optimized mobile and web applications
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div
          className={`${styles.sectionContainer} ${activeSection === "cards" ? styles.active : ""}`}
        >
          <div style={{ marginBottom: "24px" }}>
            <h2 className={styles.aboutTitle}>Your Cards</h2>
          </div>
          <div className={styles.cardsGrid}>
            {cards.map((card) => (
              <div key={card.id} className={styles.bankCard}>
                <div className={styles.cardTop}>
                  <div className={styles.cardChip} />
                  <div className={styles.cardStatus}>{card.status}</div>
                </div>
                <div className={styles.cardNumber}>{card.number}</div>
                <div className={styles.cardBottom}>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        opacity: "0.8",
                        marginBottom: "4px",
                      }}
                    >
                      CARDHOLDER
                    </div>
                    <div className={styles.cardHolder}>{card.holder}</div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        opacity: "0.8",
                        marginBottom: "4px",
                      }}
                    >
                      EXPIRES
                    </div>
                    <div className={styles.cardExpiry}>{card.expiry}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div
          className={`${styles.sectionContainer} ${activeSection === "services" ? styles.active : ""}`}
        >
          <div style={{ marginBottom: "24px" }}>
            <h2 className={styles.aboutTitle}>Our Services</h2>
          </div>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>💰</div>
              <div className={styles.serviceTitle}>Savings Accounts</div>
              <div className={styles.serviceDesc}>
                Earn interest on your savings with competitive rates
              </div>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>📈</div>
              <div className={styles.serviceTitle}>Investments</div>
              <div className={styles.serviceDesc}>
                Grow your wealth with our investment portfolio
              </div>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>💳</div>
              <div className={styles.serviceTitle}>Credit Cards</div>
              <div className={styles.serviceDesc}>
                Premium credit cards with exclusive benefits
              </div>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🏠</div>
              <div className={styles.serviceTitle}>Loans</div>
              <div className={styles.serviceDesc}>
                Flexible loan options with low interest rates
              </div>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🌐</div>
              <div className={styles.serviceTitle}>International Transfer</div>
              <div className={styles.serviceDesc}>
                Send money worldwide instantly and safely
              </div>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>📱</div>
              <div className={styles.serviceTitle}>Mobile Banking</div>
              <div className={styles.serviceDesc}>
                Bank on the go with our mobile app
              </div>
            </div>
          </div>
        </div>

        {/* Transfer/Withdraw Section */}
        <div
          className={`${styles.sectionContainer} ${activeSection === "transfer" ? styles.active : ""}`}
        >
          <div className={styles.transferForm}>
            <h2 className={styles.aboutTitle} style={{ marginBottom: "28px" }}>
              Transfer Funds
            </h2>
            <form onSubmit={handleTransfer}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Recipient Name</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter recipient name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Amount (₦)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="What is this for?"
                />
              </div>
              <button type="submit" className={styles.formButton}>
                Send Money
              </button>
            </form>
          </div>
        </div>

        {/* History Section */}
        <div
          className={`${styles.sectionContainer} ${activeSection === "history" ? styles.active : ""}`}
        >
          <div style={{ marginBottom: "24px" }}>
            <h2 className={styles.aboutTitle}>Transaction History</h2>
          </div>
          <div className={styles.historyTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderCell}>Type</div>
              <div className={styles.tableHeaderCell}>Amount</div>
              <div className={styles.tableHeaderCell}>Date</div>
              <div className={styles.tableHeaderCell}>Status</div>
            </div>
            <div className={styles.tableRows}>
              {transactions.map((tx) => (
                <div key={tx.id} className={styles.tableRow}>
                  <div className={styles.tableCell} data-label="Type">
                    {tx.type}
                  </div>
                  <div
                    className={`${styles.tableCell} ${tx.type.includes("Deposit") ? styles.amountPositive : styles.amountNegative}`}
                    data-label="Amount"
                  >
                    {tx.type.includes("Deposit") ? "+" : "-"}₦
                    {tx.amount.toLocaleString()}
                  </div>
                  <div className={styles.tableCell} data-label="Date">
                    {tx.date}
                  </div>
                  <div className={styles.tableCell} data-label="Status">
                    <span style={{ color: "#10b981", fontWeight: 600 }}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div
          className={`${styles.sectionContainer} ${activeSection === "support" ? styles.active : ""}`}
        >
          <div style={{ marginBottom: "24px" }}>
            <h2 className={styles.aboutTitle}>Customer Support</h2>
          </div>
          <div className={styles.supportContent}>
            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>📞</div>
              <div className={styles.supportTitle}>Phone Support</div>
              <div className={styles.supportText}>
                Reach our support team via phone 24/7 for immediate assistance
              </div>
              <a href="tel:+2341234567890" className={styles.supportLink}>
                +234 123 456 7890
              </a>
            </div>
            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>📧</div>
              <div className={styles.supportTitle}>Email Support</div>
              <div className={styles.supportText}>
                Send us an email and our team will respond within 24 hours
              </div>
              <a
                href="mailto:support@securebank.com"
                className={styles.supportLink}
              >
                support@securebank.com
              </a>
            </div>
            <div className={styles.supportCard}>
              <div className={styles.supportIcon}>💬</div>
              <div className={styles.supportTitle}>Live Chat</div>
              <div className={styles.supportText}>
                Chat with our support agents in real-time for quick solutions
              </div>
              <a href="#chat" className={styles.supportLink}>
                Start Chat
              </a>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div
          className={`${styles.sectionContainer} ${activeSection === "profile" ? styles.active : ""}`}
        >
          <div className={styles.profileContent}>
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className={styles.profileInfo}>
                  <h2>{user?.email?.split("@")[0]}</h2>
                  <p>{user?.email}</p>
                </div>
              </div>

              <div className={styles.profileField}>
                <div className={styles.profileFieldLabel}>Account Number</div>
                <div className={styles.profileFieldValue}>1234567890</div>
              </div>

              <div className={styles.profileField}>
                <div className={styles.profileFieldLabel}>Account Type</div>
                <div className={styles.profileFieldValue}>Premium Checking</div>
              </div>

              <div className={styles.profileField}>
                <div className={styles.profileFieldLabel}>Member Since</div>
                <div className={styles.profileFieldValue}>January 2024</div>
              </div>

              <div className={styles.profileField}>
                <div className={styles.profileFieldLabel}>Phone Number</div>
                <div className={styles.profileFieldValue}>
                  +234 800 123 4567
                </div>
              </div>

              <button className={styles.editButton}>Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div
          className={`${styles.sectionContainer} ${activeSection === "settings" ? styles.active : ""}`}
        >
          <div className={styles.settingsContent}>
            <div className={styles.settingSection}>
              <div className={styles.sectionTitle}>Notifications</div>
              <div className={styles.settingItem}>
                <div>
                  <div className={styles.settingLabel}>Email Notifications</div>
                  <div className={styles.settingDesc}>
                    Receive updates via email
                  </div>
                </div>
                <button
                  className={`${styles.toggle} ${settings.notifications ? styles.active : ""}`}
                  onClick={() => toggleSetting("notifications")}
                />
              </div>
              <div className={styles.settingItem}>
                <div>
                  <div className={styles.settingLabel}>SMS Alerts</div>
                  <div className={styles.settingDesc}>
                    Get SMS for important transactions
                  </div>
                </div>
                <button
                  className={`${styles.toggle} ${settings.twoFactor ? styles.active : ""}`}
                  onClick={() => toggleSetting("twoFactor")}
                />
              </div>
            </div>

            <div className={styles.settingSection}>
              <div className={styles.sectionTitle}>Privacy & Security</div>
              <div className={styles.settingItem}>
                <div>
                  <div className={styles.settingLabel}>
                    Two-Factor Authentication
                  </div>
                  <div className={styles.settingDesc}>
                    Enhance your account security
                  </div>
                </div>
                <button
                  className={`${styles.toggle} ${settings.twoFactor ? styles.active : ""}`}
                  onClick={() => toggleSetting("twoFactor")}
                />
              </div>
              <div className={styles.settingItem}>
                <div>
                  <div className={styles.settingLabel}>
                    Newsletter Subscription
                  </div>
                  <div className={styles.settingDesc}>
                    Receive news and updates
                  </div>
                </div>
                <button
                  className={`${styles.toggle} ${settings.newsletter ? styles.active : ""}`}
                  onClick={() => toggleSetting("newsletter")}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
