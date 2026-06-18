const items = [
  'Entrega no prazo é nossa prioridade',
  'Móveis sob medida com prazos respeitados',
  'Qualidade e pontualidade em cada projeto',
  'Confiança na entrega, excelência no resultado',
  'Madeira certificada e materiais nobres',
];

export function Ticker() {
  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-secondary py-4" aria-hidden="true">
      <div className="flex w-max animate-ticker">
        {repeated.map((item, i) => (
          <span key={i} className="mx-8 shrink-0 font-serif text-xs uppercase tracking-[0.3em] text-primary">
            {item}
            <span className="mx-8 text-border">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
