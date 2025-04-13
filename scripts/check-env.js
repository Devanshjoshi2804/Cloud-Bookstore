require('dotenv').config({ path: '.env.local' });

console.log('Checking environment variables...');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Defined ✅' : 'Missing ❌');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL ? 'Defined ✅' : 'Missing ❌');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Defined ✅' : 'Missing ❌');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Defined ✅' : 'Missing ❌'); 