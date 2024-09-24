import { type LoginInput, loginInput, registerInput, type RegisterInput, useLoginMutation, useRegisterMutation } from '@/api/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon, LoaderPinwheel } from 'lucide-react'
import { PasswordField } from '../ui/password-input'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { useNavigate } from '@tanstack/react-router'

export default function AuthDialog() {
    return (
        <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Se connecter</TabsTrigger>
                <TabsTrigger value="register">S'enregistrer</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm />
            </TabsContent>
        </Tabs>
    )
}

function LoginForm() {
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()
    const form = useForm<LoginInput>({
        resolver: zodResolver(loginInput),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const loginMutation = useLoginMutation()

    function onSubmit(values: LoginInput) {
        loginMutation.mutate(values)
    }

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            // MILA OVAINA
            navigate({ to: '/payment' })
        }
    }, [user])

    return (
        <div className="w-full pt-4">
            <Form {...form}>
                <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-2">
                    {loginMutation.error && (
                        <Alert variant="destructive">
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{loginMutation.error.message}</AlertDescription>
                        </Alert>
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="max@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <PasswordField label="Mot de passe" placeholder="••••••••••" />
                    <Button type="submit" className="w-full mt-2" size="lg">
                        {loginMutation.isPending && <LoaderPinwheel className="animate-spin size-5 mr-2" />}
                        Continuer
                    </Button>
                </form>
            </Form>
        </div>
    )
}

function RegisterForm() {
    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerInput),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: 'CUSTOMER'
        }
    })

    const registerMutation = useRegisterMutation()

    function onSubmit(values: RegisterInput) {
        registerMutation.mutate(values)
    }
    return (
        <div className="w-full pt-4">
            <Form {...form}>
                <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-2">
                    {registerMutation.error && (
                        <Alert variant="destructive">
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{registerMutation.error.message}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Robinson" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Max" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="max@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <PasswordField label="Mot de passe" placeholder="••••••••••" />
                    <Button type="submit" className="w-full mt-2" size="lg">
                        {registerMutation.isPending && <LoaderPinwheel className="animate-spin size-5 mr-2" />}
                        Créer le compte
                    </Button>
                </form>
            </Form>
        </div>
    )
}
