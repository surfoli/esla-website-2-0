import { redirect } from 'next/navigation';

export default function AdminIndex() {
  // Server-Redirect auf die KV-gestützte Verwaltung
  redirect('/admin/matches');
  return null;
}

