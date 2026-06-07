import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LogOut, Trash2, Settings, Users, Activity, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import type { Application } from "@workspace/api-client-react";

import {
  useAdminLogin,
  useAdminLogout,
  useGetAdminMe,
  getGetAdminMeQueryKey,
  useGetSettings,
  getGetSettingsQueryKey,
  useUpdateSettings,
  useListApplications,
  useGetApplicationStats,
  getGetApplicationStatsQueryKey,
  useDeleteApplication,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const loginSchema = z.object({
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

const settingsSchema = z.object({
  kakaoLink: z.string().optional(),
  telegramBotToken: z.string().optional(),
  telegramChatId: z.string().optional(),
  companyName: z.string().optional(),
  representative: z.string().optional(),
  businessNumber: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export default function Admin() {
  const { data: session, isLoading: checkingAuth, isError } = useGetAdminMe(
    { query: { retry: false, queryKey: getGetAdminMeQueryKey() } }
  );
  const isAuthenticated = !isError && session?.authenticated === true;

  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}

function LoginForm() {
  const login = useAdminLogin();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate({ data: values }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetAdminMeQueryKey() });
      },
      onError: () => {
        toast({
          title: "로그인 실패",
          description: "비밀번호를 확인해주세요.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary font-bold">퍼펙트론 관리자</CardTitle>
          <CardDescription>관리자 비밀번호를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="비밀번호" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={login.isPending}>
                {login.isPending ? "로그인 중..." : "로그인"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  const logout = useAdminLogout();
  const queryClient = useQueryClient();
  
  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetAdminMeQueryKey() });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary">퍼펙트론 관리자</div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500">
            <LogOut className="h-4 w-4 mr-2" /> 로그아웃
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-white border w-full justify-start h-auto p-1 rounded-lg">
            <TabsTrigger value="applications" className="py-2.5 px-4"><Users className="h-4 w-4 mr-2" />상담 신청 목록</TabsTrigger>
            <TabsTrigger value="settings" className="py-2.5 px-4"><Settings className="h-4 w-4 mr-2" />환경 설정</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="space-y-6 m-0">
            <StatsRow />
            <ApplicationsTable />
          </TabsContent>
          
          <TabsContent value="settings" className="m-0">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatsRow() {
  const { data: stats } = useGetApplicationStats();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1 font-medium">오늘 신청</p>
          <p className="text-3xl font-bold text-primary">{stats?.today || 0}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1 font-medium">이번 주</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.thisWeek || 0}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1 font-medium">이번 달</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.thisMonth || 0}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1 font-medium">전체 누적</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.total || 0}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ApplicationsTable() {
  const { data, refetch } = useListApplications({ page: 1, limit: 100 });
  const deleteApp = useDeleteApplication();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [apps, setApps] = useState<Application[]>([]);
  const [flashingIds, setFlashingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (data?.applications) {
      setApps(data.applications);
    }
  }, [data]);

  useEffect(() => {
    const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "new_application" && msg.data) {
          const newApp = msg.data as Application;
          setApps(prev => [newApp, ...prev]);
          setFlashingIds(prev => new Set(prev).add(newApp.id));
          
          queryClient.invalidateQueries({ queryKey: getGetApplicationStatsQueryKey() });
          
          setTimeout(() => {
            setFlashingIds(prev => {
              const next = new Set(prev);
              next.delete(newApp.id);
              return next;
            });
          }, 3000);
        }
      } catch (err) {
        console.error("WS parse error", err);
      }
    };

    return () => ws.close();
  }, [queryClient]);

  const handleDelete = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteApp.mutate({ id }, {
        onSuccess: () => {
          setApps(prev => prev.filter(app => app.id !== id));
          toast({ title: "삭제되었습니다." });
          queryClient.invalidateQueries({ queryKey: getGetApplicationStatsQueryKey() });
        }
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>상담 신청 목록</CardTitle>
          <CardDescription>실시간으로 업데이트됩니다.</CardDescription>
        </div>
        <Activity className="h-5 w-5 text-primary animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead className="w-32">이름</TableHead>
                <TableHead className="w-40">연락처</TableHead>
                <TableHead>메모/문의내용</TableHead>
                <TableHead className="w-40">신청일시</TableHead>
                <TableHead className="w-20 text-center">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    신청 내역이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                apps.map((app) => (
                  <TableRow 
                    key={app.id} 
                    className={flashingIds.has(app.id) ? "animate-flash" : ""}
                  >
                    <TableCell className="font-medium text-gray-500">#{app.id}</TableCell>
                    <TableCell className="font-bold">{app.name}</TableCell>
                    <TableCell>{app.phone}</TableCell>
                    <TableCell className="text-gray-600 max-w-md truncate" title={app.memo || ""}>
                      {app.memo || "-"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {format(new Date(app.createdAt), "yyyy.MM.dd HH:mm")}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(app.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function SettingsPanel() {
  const { data: settings, isLoading } = useGetSettings();
  const updateSettings = useUpdateSettings();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      kakaoLink: "",
      telegramBotToken: "",
      telegramChatId: "",
      companyName: "",
      representative: "",
      businessNumber: "",
      address: "",
      phone: "",
    },
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (settings && !isInitialized.current) {
      form.reset({
        kakaoLink: settings.kakaoLink || "",
        telegramBotToken: settings.telegramBotToken || "",
        telegramChatId: settings.telegramChatId || "",
        companyName: settings.companyName || "",
        representative: settings.representative || "",
        businessNumber: settings.businessNumber || "",
        address: settings.address || "",
        phone: settings.phone || "",
      });
      isInitialized.current = true;
    }
  }, [settings, form]);

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    updateSettings.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "설정이 저장되었습니다." });
        queryClient.invalidateQueries({ queryKey: getGetSettingsQueryKey() });
      },
      onError: () => {
        toast({ title: "저장 실패", variant: "destructive" });
      }
    });
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>환경 설정</CardTitle>
        <CardDescription>연동 및 사업자 정보를 관리합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">연동 설정</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="kakaoLink" render={({ field }) => (
                  <FormItem>
                    <FormLabel>카카오톡 링크 (URL)</FormLabel>
                    <FormControl><Input placeholder="https://open.kakao.com/o/..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="telegramBotToken" render={({ field }) => (
                    <FormItem>
                      <FormLabel>텔레그램 봇 토큰</FormLabel>
                      <FormControl><Input placeholder="0000000000:AAH..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="telegramChatId" render={({ field }) => (
                    <FormItem>
                      <FormLabel>텔레그램 채팅방 ID</FormLabel>
                      <FormControl><Input placeholder="-100000000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg border-b pb-2">사업자 정보 (푸터 노출)</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="companyName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>상호명</FormLabel>
                    <FormControl><Input placeholder="퍼펙트론" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="representative" render={({ field }) => (
                  <FormItem>
                    <FormLabel>대표자</FormLabel>
                    <FormControl><Input placeholder="홍길동" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="businessNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>사업자등록번호</FormLabel>
                    <FormControl><Input placeholder="123-45-67890" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>대표전화</FormLabel>
                    <FormControl><Input placeholder="1588-0000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>사업장 주소</FormLabel>
                    <FormControl><Input placeholder="서울특별시 강남구..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto" disabled={updateSettings.isPending}>
              {updateSettings.isPending ? "저장 중..." : "설정 저장하기"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
