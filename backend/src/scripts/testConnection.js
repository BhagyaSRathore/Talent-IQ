import 'dotenv/config';
import dns from 'dns';
import mongoose from 'mongoose';

// Fix: Node.js may resolve DNS through 127.0.0.1 (no local daemon → ECONNREFUSED).
// Override to Google DNS so Atlas SRV lookups always work.
const currentDns = dns.getServers();
if (currentDns.length === 1 && currentDns[0] === '127.0.0.1') {
  console.log('⚠️  Overriding broken DNS (127.0.0.1) → 8.8.8.8 for Atlas SRV lookup');
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

async function testConnection() {
  console.log('🔍 Testing MongoDB Connection...\n');
  console.log('Connection String (masked):', 
    process.env.DB_URL?.replace(/:[^:@]+@/, ':****@') || 'NOT FOUND IN .env'
  );
  
  if (!process.env.DB_URL) {
    console.error('❌ DB_URL not found in environment variables');
    return;
  }

  try {
    console.log('\n⏳ Attempting to connect...');
    
    // Set longer timeout for better diagnosis
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 30000,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log('   Database:', mongoose.connection.db.databaseName);
    console.log('   Host:', mongoose.connection.host);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('   Collections:', collections.map(c => c.name).join(', ') || 'none yet');
    
    await mongoose.disconnect();
    console.log('\n✅ Connection test passed!');
    
  } catch (error) {
    console.error('\n❌ Connection Failed:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.log('\n💡 Troubleshooting Steps:');
      console.log('   1. Check MongoDB Atlas Network Access');
      console.log('      → Go to: https://cloud.mongodb.com');
      console.log('      → Network Access → Add your current IP or use 0.0.0.0/0 for testing');
      console.log('   2. Verify cluster is running (not paused)');
      console.log('   3. Check your internet connection');
      console.log('   4. Check Node.js DNS: run: node -e "require(\'dns\').getServers().forEach(s=>console.log(s))"');
      console.log('   5. If DNS shows 127.0.0.1 only, add DNS_SERVER=8.8.8.8 to backend/.env');
    } else if (error.name === 'MongoServerError' && error.code === 8000) {
      console.log('\n💡 Authentication failed - check username/password');
    }
    
    process.exit(1);
  }
}

testConnection();
