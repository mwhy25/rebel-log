import './globals.css';

export const metadata = {
  title: 'REBEL LOG — Daily Confidant Record',
  description: 'Diary kreator konten AI bertema Persona 5',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
