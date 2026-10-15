import dns from "dns";
import mongoose from "mongoose";

import { ENV } from "./env.js";

/**
 * Fix: Node.js may pick up 127.0.0.1 as its DNS server (from resolv.conf or
 * a local DNS proxy) even when the OS network adapter uses a real DNS server.
 * When no local DNS daemon is running on 127.0.0.1, every SRV lookup
 * (required by mongodb+srv:// URIs) fails with ECONNREFUSED — which is what
 * broke the Atlas connection.
 *
 * Solution: Override dns.setServers() before any network call so Node.js
 * uses the correct DNS server. Configure DNS_SERVER in .env for flexibility.
 * Falls back to Google DNS (8.8.8.8) which always works for Atlas hostnames.
 */
const fixDnsServers = () => {
  const currentServers = dns.getServers();
  const hasBrokenLoopback =
    currentServers.length === 1 && currentServers[0] === "127.0.0.1";

  if (hasBrokenLoopback) {
    const dnsServer = process.env.DNS_SERVER || "8.8.8.8";
    console.log(
      `⚠️  Node.js DNS is pointed at 127.0.0.1 (no local DNS daemon). ` +
        `Overriding to ${dnsServer} so Atlas SRV lookups succeed.`
    );
    dns.setServers([dnsServer, "8.8.4.4"]);
  }
};

export const connectDB = async () => {
  try {
    if (!ENV.DB_URL) {
      console.warn(
        "⚠️  DB_URL is not defined in environment variables - running without database"
      );
      return;
    }

    // Ensure DNS can resolve Atlas SRV records before connecting
    fixDnsServers();

    const conn = await mongoose.connect(ENV.DB_URL);
    console.log("✅ Connected to MongoDB:", conn.connection.host);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    if (error.code === "ECONNREFUSED" && error.syscall === "querySrv") {
      console.error(
        "   → DNS SRV lookup failed. Check that your DNS server is reachable."
      );
      console.error(
        "   → Add DNS_SERVER=<your-dns-ip> to backend/.env to override."
      );
    }
    console.warn("⚠️  Continuing without database connection for development");
    // Don't exit the process, just warn and continue
  }
};