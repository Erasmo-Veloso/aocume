/** Formata um valor em Kwanzas (AOA). Devolve "Sob consulta" quando não há preço. */
export function formatPrice(value: number | null): string {
  if (value == null) return "Sob consulta";
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0,
  }).format(value);
}

const PRODUCT_TYPE_LABEL: Record<string, string> = {
  ORDER: "Por encomenda",
  READY_STOCK: "Pronta entrega",
};

const PAYMENT_TYPE_LABEL: Record<string, string> = {
  PARTIAL: "Sinal + saldo na entrega",
  FULL: "Pagamento total",
};

export function productTypeLabel(type: string): string {
  return PRODUCT_TYPE_LABEL[type] ?? type;
}

export function paymentTypeLabel(type: string): string {
  return PAYMENT_TYPE_LABEL[type] ?? type;
}
