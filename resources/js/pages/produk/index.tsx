import { Form, Head, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Search,
  Trash2,
  Upload,
} from 'lucide-react';
import qs from 'qs';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AppLayout } from '@/layouts/app-layout';
import { store } from '@/routes/produk';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Produk',
    href: '/produk',
  },
];

interface ProdukPageProps {
  data: Array<{
    id: number;
    name: string;
    category: string;
    description: string | null;
    image: string | null;
    user_id: number | null;
    created_at: string | null;
    updated_at: string | null;
  }>;
  current_page?: number;
  per_page?: number;
  total?: number;
  last_page?: number;
  kategori?: string;
  search?: string;
}

const ProdukPage = ({
  data = [],
  current_page = 1,
  per_page = 10,
  total = 0,
  last_page = 1,
  kategori: kategoriFilter = '*',
  search: searchFilter = '',
}: ProdukPageProps) => {
  const { url } = usePage();
  const ids = {
    foto: useId(),
    nama: useId(),
    kategori: useId(),
    search: useId(),
  };

  const categories = [
    { value: '*', label: 'Semua' },
    { value: 'Makanan', label: 'Makanan' },
    { value: 'Minuman', label: 'Minuman' },
  ];

  const [kategori, setKategori] = useState('Makanan');
  const [search, setSearch] = useState(searchFilter);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateQueryParams = (params: Record<string, string | number>) => {
    const urlObj = new URL(url, window.location.origin);
    const currentParams = qs.parse(urlObj.search, { ignoreQueryPrefix: true });

    // Update params
    Object.entries(params).forEach(([key, value]) => {
      if (
        value === '*' ||
        value === '' ||
        value === null ||
        value === undefined
      ) {
        delete currentParams[key];
      } else {
        currentParams[key] = String(value);
      }
    });

    const queryString = qs.stringify(currentParams, { addQueryPrefix: true });
    const newUrl = urlObj.pathname + queryString;

    router.get(newUrl, {}, { preserveState: true, preserveScroll: true });
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        updateQueryParams({ search: value, page: 1 });
      }, 500),
    [],
  );

  const handleKategoriChange = (value: string) => {
    updateQueryParams({ kategori: value, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateQueryParams({ page });
  };

  const handlePageSizeChange = (size: number) => {
    updateQueryParams({ per_page: size, page: 1 });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  // Sync search state with props
  useEffect(() => {
    setSearch(searchFilter);
  }, [searchFilter]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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

  const columns = [
    { key: 'image', header: 'Gambar' },
    { key: 'name', header: 'Nama' },
    { key: 'category', header: 'Kategori' },
    { key: 'description', header: 'Deskripsi' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Produk" />

      <div className="flex w-full flex-col gap-6 px-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 lg:max-w-sm">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id={ids.search}
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="view-selector" className="sr-only">
              Tampilan
            </Label>
            <Select value={kategoriFilter} onValueChange={handleKategoriChange}>
              <SelectTrigger className="w-fit" size="sm" id="view-selector">
                <SelectValue placeholder="Pilih kategori" />
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
                                  className="relative block h-auto w-full cursor-pointer overflow-hidden rounded-sm border border-border"
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
                                    name="image"
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
                                className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-border transition-colors hover:border-primary hover:bg-accent"
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
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                              </label>
                            )}
                            {errors.image && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.image}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={ids.nama}>Nama Produk *</Label>
                            <Input
                              id={ids.nama}
                              name="name"
                              placeholder="Contoh: Mie Goreng"
                              required
                            />
                            {errors.name && (
                              <p className="text-sm text-red-500">
                                {errors.name}
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
                              <SelectTrigger
                                className="w-full"
                                id={ids.kategori}
                              >
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
                              name="category"
                              value={kategori}
                            />
                            {errors.category && (
                              <p className="text-sm text-red-500">
                                {errors.category}
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

        <div className="overflow-hidden rounded-sm border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {data.length > 0 ? (
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="h-16 w-16 overflow-hidden rounded-sm">
                        <img
                          src={row.image || '/placeholder.svg'}
                          alt={row.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {row.description || '-'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Tidak ada hasil.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            Menampilkan {data.length} dari {total} produk
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Baris per halaman
              </Label>
              <Select
                value={`${per_page}`}
                onValueChange={(value) => {
                  handlePageSizeChange(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={per_page} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Halaman {current_page} dari {last_page}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => handlePageChange(1)}
                disabled={current_page === 1}
              >
                <span className="sr-only">Ke halaman pertama</span>
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => handlePageChange(current_page - 1)}
                disabled={current_page === 1}
              >
                <span className="sr-only">Ke halaman sebelumnya</span>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => handlePageChange(current_page + 1)}
                disabled={current_page >= last_page}
              >
                <span className="sr-only">Ke halaman berikutnya</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => handlePageChange(last_page)}
                disabled={current_page >= last_page}
              >
                <span className="sr-only">Ke halaman terakhir</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProdukPage;
