import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hcjggvkisxndmxhbadxi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjamdndmtpc3huZG14aGJhZHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMTAyMDAsImV4cCI6MjA0MzY4NjIwMH0.jlkhFckHkRQcpYwdL6RUbbR4bndoia968simIaTMmv4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
