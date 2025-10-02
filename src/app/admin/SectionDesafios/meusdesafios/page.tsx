"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Desafio = {
  id: number;
  titulo: string;
  empresa: string;
  categoria: string;
  status: string;
  submissões: number;
  prazo: string;
  descricao?: string;
  objetivos?: string;
  beneficios?: string;
  visibilidade: "publico" | "interno";
};

export default function Desafiopage() {
  const [desafios, setDesafios] = useState<Desafio[]>([
    {
      id: 1,
      titulo: "Sustentabilidade em Embalagens",
      empresa: "Ambev",
      categoria: "Sustentabilidade",
      status: "Ativo",
      submissões: 24,
      prazo: "2024-12-15",
      descricao: "Reduzir uso de plástico em embalagens de bebidas.",
      objetivos: "Diminuir impacto ambiental",
      beneficios: "Parceria e contrato com a empresa",
      visibilidade: "publico",
    },
    {
      id: 2,
      titulo: "IoT para Agricultura de Precisão",
      empresa: "John Deere",
      categoria: "Tecnologia",
      status: "Ativo",
      submissões: 18,
      prazo: "2024-11-30",
      descricao: "Desenvolver soluções IoT para agricultura moderna.",
      objetivos: "Aumentar eficiência agrícola",
      beneficios: "Reconhecimento e premiação",
      visibilidade: "interno",
    },
  ]);

  const [formData, setFormData] = useState({
    titulo: "",
    empresa: "",
    categoria: "",
    descricao: "",
    objetivos: "",
    beneficios: "",
    visibilidade: "publico" as "publico" | "interno",
    prazo: "",
  });

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const iniciarEdicao = (desafio: Desafio) => {
    setFormData({
      titulo: desafio.titulo,
      empresa: desafio.empresa,
      categoria: desafio.categoria,
      descricao: desafio.descricao || "",
      objetivos: desafio.objetivos || "",
      beneficios: desafio.beneficios || "",
      visibilidade: desafio.visibilidade,
      prazo: desafio.prazo,
    });
    setEditandoId(desafio.id);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({
      titulo: "",
      empresa: "",
      categoria: "",
      descricao: "",
      objetivos: "",
      beneficios: "",
      visibilidade: "publico",
      prazo: "",
    });
  };

  const salvarEdicao = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.empresa || !formData.categoria) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    if (editandoId) {
      setDesafios(prev => prev.map(d => 
        d.id === editandoId 
          ? { ...d, ...formData }
          : d
      ));
      cancelarEdicao();
    }
  };

  const excluirDesafio = (id: number) => {
    setDesafios(prev => prev.filter(desafio => desafio.id !== id));
  };
    // Vai receber a url da pag "admin/desafio"
    const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Formulário de Edição */}
        {editandoId && (
          <Card>
            <CardHeader>
              <CardTitle>Editando Desafio</CardTitle>
              <CardDescription>
                Faça as alterações necessárias no desafio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={salvarEdicao} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      placeholder="Título do desafio"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="empresa">Empresa *</Label>
                    <Input
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Nome da empresa"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria *</Label>
                    <Select
                      value={formData.categoria}
                      onValueChange={(value) => handleSelectChange("categoria", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sustentabilidade">Sustentabilidade</SelectItem>
                        <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="Saúde">Saúde</SelectItem>
                        <SelectItem value="Educação">Educação</SelectItem>
                        <SelectItem value="Energia">Energia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prazo">Prazo *</Label>
                    <Input
                      type="date"
                      id="prazo"
                      name="prazo"
                      value={formData.prazo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Descrição detalhada do desafio"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objetivos">Objetivos</Label>
                  <Textarea
                    id="objetivos"
                    name="objetivos"
                    value={formData.objetivos}
                    onChange={handleChange}
                    placeholder="Objetivos esperados"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="beneficios">Benefícios</Label>
                  <Textarea
                    id="beneficios"
                    name="beneficios"
                    value={formData.beneficios}
                    onChange={handleChange}
                    placeholder="Benefícios oferecidos"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Visibilidade</Label>
                  <RadioGroup
                    value={formData.visibilidade}
                    onValueChange={(value: "publico" | "interno") => 
                      handleSelectChange("visibilidade", value)
                    }
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="publico" id="publico" />
                      <Label htmlFor="publico">Público</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="interno" id="interno" />
                      <Label htmlFor="interno">Interno</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={cancelarEdicao}
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de Desafios */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Todos os Desafios</h2>
                <p className="text-muted-foreground">
                  Gerencie os desafios criados na plataforma
                </p>
              </div>
              <Button
              onClick={() => router.push("/admin/SectionDesafios/desafio")}
               disabled={!!editandoId}>
                Criar Novo Desafio
              </Button>
            </div>

            {desafios.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum desafio criado ainda.
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submissões</TableHead>
                      <TableHead>Prazo</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {desafios.map((desafio) => (
                      <TableRow key={desafio.id}>
                        <TableCell className="font-medium">{desafio.titulo}</TableCell>
                        <TableCell>{desafio.empresa}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{desafio.categoria}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={desafio.status === "Ativo" ? "default" : "secondary"}>
                            {desafio.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{desafio.submissões}</TableCell>
                        <TableCell>{desafio.prazo}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => iniciarEdicao(desafio)}
                              disabled={!!editandoId && editandoId !== desafio.id}
                            >
                              {editandoId === desafio.id ? "Editando..." : "Editar"}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:bg-destructive/10"
                                  disabled={!!editandoId}
                                >
                                  Excluir
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Confirmar exclusão
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o desafio {desafio.titulo}? 
                                    Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => excluirDesafio(desafio.id)}
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}