"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Dashboard() {
  const [products, setProducts] = useState<{ id: string; title: string }[]>([]);
  const [newListTitle, setNewListTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(products);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setProducts(reordered);
  };

  const addNewCard = () => {
    if (!newListTitle.trim()) return;

    const newId = (products.length + 1).toString();
    setProducts([...products, { id: newId, title: newListTitle }]);
    setNewListTitle("");
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mt-10">
        <h1 className="text-2xl font-bold text-foreground">Hello Martin!</h1>
        <p className="text-muted-foreground text-sm">
          Welcome to your overview of your account.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-foreground mb-4">
          My Products
        </h2>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="products" direction="horizontal">
            {(provided) => (
              <div
                className="flex gap-6 overflow-x-auto pb-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {products.map((product, index) => (
                  <Draggable
                    key={product.id}
                    draggableId={product.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="cursor-grab"
                      >
                        <ProductCard title={product.title} />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}

                {/* Botão de Add Card */}
                <div className="flex-none">
                  {!isAdding ? (
                    <Card
                      className="bg-primary text-primary-foreground 
                                 shadow-sm rounded-lg w-44 h-28 
                                 flex items-center justify-center cursor-pointer 
                                 hover:opacity-90 transition"
                      onClick={() => setIsAdding(true)}
                    >
                      <CardContent className="flex items-center justify-center p-0">
                        <span className="text-sm font-semibold">
                          {products.length === 0
                            ? "Adicionar uma lista"
                            : "+ Add new"}
                        </span>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="p-4 w-56">
                      <div className="flex flex-col gap-2">
                        <Input
                          type="text"
                          placeholder="Nome da lista"
                          value={newListTitle}
                          onChange={(e) => setNewListTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") addNewCard();
                          }}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={addNewCard}>
                            Adicionar
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              setIsAdding(false);
                              setNewListTitle("");
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
}
