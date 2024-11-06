import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Lock, CircleDollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CrossCategoryNav() {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: 'Observability',
      description: 'Monitor system health and performance',
      icon: Eye,
      path: '/observability/overview',
    },
    {
      title: 'Security',
      description: 'Review security posture and threats',
      icon: Lock,
      path: '/security/overview',
    },
    {
      title: 'Cost Management',
      description: 'Track and optimize resource costs',
      icon: CircleDollarSign,
      path: '/costs/overview',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Access</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map((link) => (
            <Button
              key={link.title}
              variant="outline"
              className="h-auto flex-col items-start gap-2 p-4"
              onClick={() => navigate(link.path)}
            >
              <div className="flex items-center gap-2">
                <link.icon className="h-5 w-5" />
                <span className="font-semibold">{link.title}</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                {link.description}
              </p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}