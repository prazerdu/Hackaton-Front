'use client';
import { faker } from '@faker-js/faker';
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const columns = [
  { id: faker.string.uuid(), name: 'Captura de ideias', color: '#6366F1' },
  { id: faker.string.uuid(), name: 'Triagem', color: '#F59E0B' },
  { id: faker.string.uuid(), name: 'Ideação', color: '#10B981' },
  { id: faker.string.uuid(), name: 'Triagem detalhada', color: '#3B82F6' },
  { id: faker.string.uuid(), name: 'POCs', color: '#8B5CF6' },
];

const users = Array.from({ length: 4 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
}));

const exampleFeatures = Array.from({ length: 20 }).map(() => ({
  id: faker.string.uuid(),
  name: capitalize(faker.company.buzzPhrase()),
  startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
  endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
  column: faker.helpers.arrayElement(columns).id,
  owner: faker.helpers.arrayElement(users),
}));

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const shortDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  day: 'numeric',
});

const MAX_CARDS_VISIBLE = 4;

const Example = () => {
  const [features, setFeatures] = useState(exampleFeatures);

  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-2">
      <KanbanProvider columns={columns} data={features} onDataChange={setFeatures}>
        {(column) => {
          const cardsInColumn = features.filter((f) => f.column === column.id);
          const enableScroll = cardsInColumn.length > MAX_CARDS_VISIBLE;

          return (
            <KanbanBoard id={column.id} key={column.id}>
              <KanbanHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: column.color }}
                    />
                    <span>{column.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {cardsInColumn.length}
                  </span>
                </div>
              </KanbanHeader>

              <div
                className={`transition-all ${
                  enableScroll ? 'max-h-[80dvh] overflow-y-auto' : ''
                }`}
              >
                <KanbanCards id={column.id}>
                  {(feature: (typeof features)[number]) => (
                    <KanbanCard
                      column={column.id}
                      id={feature.id}
                      key={feature.id}
                      name={feature.name}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <p className="m-0 flex-1 font-medium text-sm">
                            {feature.name}
                          </p>
                        </div>
                        {feature.owner && (
                          <Avatar className="h-4 w-4 shrink-0">
                            <AvatarFallback>
                              {feature.owner.name?.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <p className="m-0 text-muted-foreground text-xs">
                        {shortDateFormatter.format(feature.startAt)} -{' '}
                        {dateFormatter.format(feature.endAt)}
                      </p>
                    </KanbanCard>
                  )}
                </KanbanCards>
              </div>
            </KanbanBoard>
          );
        }}
      </KanbanProvider>
    </div>
  );
};

export default Example;
