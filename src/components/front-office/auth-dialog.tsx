import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
    return (
        <div className="w-full pt-4">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" type="password" placeholder="*******" required />
                </div>
                <Button className="w-full" size="lg">
                    Se connecter
                </Button>
            </div>
        </div>
    )
}

function RegisterForm() {
    return (
        <div className="w-full pt-4">
            <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Nom</Label>
                        <Input id="last-name" placeholder="Robinson" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">Prénom</Label>
                        <Input id="first-name" placeholder="Max" required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" type="password" />
                </div>
                <Button type="submit" className="w-full" size="lg">
                    Créer compte
                </Button>
            </div>
        </div>
    )
}
