import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AppLayout } from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Produk',
    href: '/produk',
  },
];

const ProdukPage = () => {
  const categories = [
    { value: '*', label: 'Semua' },
    { value: 'Makanan', label: 'Makanan' },
    { value: 'Minuman', label: 'Minuman' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Produk" />

      <div className="w-full flex-col justify-start gap-6">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <Label htmlFor="view-selector" className="sr-only">
            View
          </Label>
          <Select defaultValue="*">
            <SelectTrigger className="flex w-fit" size="sm" id="view-selector">
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(({ value, label }, k) => (
                <SelectItem key={k} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus />
                <span className="hidden lg:inline">Tambah Produk</span>
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Produk Baru</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Tambahkan produk baru ke dalam sistem. Isi semua informasi yang
                diperlukan untuk produk ini. Pastikan data yang dimasukkan sudah
                benar sebelum disimpan.
              </DialogDescription>
              <Form className="space-y-4 py-4">
                {({ resetAndClearErrors, processing, errors }) => (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="nama">Nama Produk *</Label>
                      <Input
                        id="nama"
                        placeholder="Contoh: Mie Goreng"
                        required
                      />
                      {errors.nama && (
                        <p className="text-sm text-red-500">{errors.nama}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kategori">Kategori *</Label>
                      <Select defaultValue="Makanan" required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .filter(({ value }) => value !== '*')
                            .map(({ value, label }, k) => (
                              <SelectItem key={k} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          onClick={() => {
                            resetAndClearErrors();
                          }}
                        >
                          Batal
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="gradient-primary text-primary-foreground"
                        disabled={processing}
                      >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProdukPage;
