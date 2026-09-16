import AdminGate from '../../components/AdminGate';
import AdminForm from '../../components/AdminForm';

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminForm />
    </AdminGate>
  );
}
