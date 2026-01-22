import { Form, Head } from '@inertiajs/react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { useId, useRef, useState } from 'react';

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
import { store } from '@/routes/produk';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Produk',
    href: '/produk',
  },
];

const ProdukPage = () => {
  const ids = {
    foto: useId(),
    nama: useId(),
    kategori: useId(),
  };

  const categories = [
    { value: '*', label: 'Semua' },
    { value: 'Makanan', label: 'Makanan' },
    { value: 'Minuman', label: 'Minuman' },
  ];

  const [kategori, setKategori] = useState('Makanan');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Produk" />

      <div className="flex w-full flex-col gap-6 px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="view-selector" className="sr-only">
            Tampilan
          </Label>
          <Select defaultValue="*">
            <SelectTrigger className="w-fit" size="sm" id="view-selector">
              <SelectValue placeholder="Pilih tampilan" />
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

            <DialogContent className="overflow-y-auto p-0">
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle>Tambah Produk Baru</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Tambahkan produk baru ke dalam sistem. Isi semua informasi
                  yang diperlukan untuk produk ini. Pastikan data yang
                  dimasukkan sudah benar sebelum disimpan.
                </DialogDescription>
                <Form
                  {...store.form()}
                  options={{
                    preserveScroll: true,
                  }}
                  onSuccess={() => {
                    setPreview(null);
                    setKategori('Makanan');
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  onFinish={() => {
                    console.log('ok');
                  }}
                  className="space-y-4 py-4"
                >
                  {({ resetAndClearErrors, processing, errors }) => (
                    <>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={ids.foto}>Foto Produk</Label>
                          <p className="mb-2 text-sm text-muted-foreground">
                            Upload foto produk (opsional)
                          </p>
                          {preview ? (
                            <div className="relative">
                              <label
                                htmlFor={ids.foto}
                                className="relative block h-auto w-full cursor-pointer overflow-hidden rounded-lg border border-border"
                              >
                                <img
                                  src={preview}
                                  alt="Preview"
                                  className="h-full w-full object-cover"
                                />
                                <input
                                  ref={fileInputRef}
                                  id={ids.foto}
                                  type="file"
                                  name="foto"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                              </label>
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveImage();
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <label
                              htmlFor={ids.foto}
                              className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:border-primary hover:bg-accent"
                            >
                              <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                              <span className="text-sm text-foreground">
                                Klik untuk upload foto
                              </span>
                              <span className="mt-1 text-xs text-muted-foreground">
                                Hanya 1 gambar
                              </span>
                              <input
                                ref={fileInputRef}
                                id={ids.foto}
                                type="file"
                                name="foto"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          )}
                          {errors.foto && (
                            <p className="mt-2 text-sm text-red-500">
                              {errors.foto}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={ids.nama}>Nama Produk *</Label>
                          <Input
                            id={ids.nama}
                            name="nama"
                            placeholder="Contoh: Mie Goreng"
                            required
                          />
                          {errors.nama && (
                            <p className="text-sm text-red-500">
                              {errors.nama}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={ids.kategori}>Kategori *</Label>
                          <Select
                            value={kategori}
                            onValueChange={setKategori}
                            required
                          >
                            <SelectTrigger className="w-full" id={ids.kategori}>
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
                          <input
                            type="hidden"
                            name="kategori"
                            value={kategori}
                          />
                          {errors.kategori && (
                            <p className="text-sm text-red-500">
                              {errors.kategori}
                            </p>
                          )}
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            variant="outline"
                            onClick={() => {
                              resetAndClearErrors();
                              setPreview(null);
                              setKategori('Makanan');
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
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
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProdukPage;
