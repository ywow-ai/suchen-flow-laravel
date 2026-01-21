import { Head } from '@inertiajs/react';
import { AlertCircle, Server, Shield, Wrench } from 'lucide-react';

interface ErrorPageProps {
  status: number;
}

export default function ErrorPage({ status }: ErrorPageProps) {
  const errorConfig: Record<
    number,
    { title: string; description: string; icon: any }
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
      <div className="mb-6 rounded-full bg-gray-100 p-8">
        <Icon className="h-16 w-16 text-gray-600" />
      </div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
}
