const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env (if present)
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl|| !supabaseKey) {

  const error = new Error('SUPABASE_URL or SUPABASE_KEY is not set in environment. Please set them in .env or process env.');
  console.warn('Warning: SUPABASE_URL or SUPABASE_KEY is not set in environment. Supabase client will throw on use.');

  const stub = new Proxy({}, {
    get() {
      return () => { throw error; };
    }
  });

  module.exports = stub;
} else {
  const supabase = createClient(supabaseUrl, supabaseKey);
  module.exports = supabase;
}
