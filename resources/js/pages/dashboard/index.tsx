import { AppLayout } from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dasbor',
    href: '/',
  },
];

const DashboardPage = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dasbor" />
      <p>Dasbor</p>
    </AppLayout>
  );
};

export default DashboardPage;
