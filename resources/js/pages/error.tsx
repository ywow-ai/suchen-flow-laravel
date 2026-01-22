import { Head, router } from '@inertiajs/react';
import { AlertCircle, LucideIcon, Server, Shield, Wrench } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  status: number;
}

export default function ErrorPage({ status }: ErrorPageProps) {
  const errorConfig: Record<
    number,
    { title: string; description: string; icon: LucideIcon }
  > = {
    404: {
      title: '404: Halaman Tidak Ditemukan',
      description: 'Halaman yang Anda cari tidak dapat ditemukan.',
      icon: AlertCircle,
    },
    403: {
      title: '403: Dilarang',
      description: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
      icon: Shield,
    },
    500: {
      title: '500: Kesalahan Server',
      description: 'Terjadi kesalahan pada server kami.',
      icon: Server,
    },
    503: {
      title: '503: Layanan Tidak Tersedia',
      description: 'Kami sedang dalam pemeliharaan. Silakan coba lagi nanti.',
      icon: Wrench,
    },
  };

  const {
    title,
    description,
    icon: Icon,
  } = errorConfig[status] || {
    title: `${status}: Kesalahan Tidak Terduga`,
    description:
      'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi nanti.',
    icon: AlertCircle,
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Head title={title} />
      <div className="mb-6 rounded-sm bg-muted p-8">
        <Icon className="h-16 w-16 text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <div className="mt-6 flex gap-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Kembali
        </Button>
        <Button onClick={() => router.visit('/')}>Kembali ke Dasbor</Button>
      </div>
    </div>
  );
}
