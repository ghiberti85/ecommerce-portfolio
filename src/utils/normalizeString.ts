// src/utils/normalizeString.ts
export function normalizeString(str: string) {
    return str
      .normalize("NFD") // Decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remover acentos
      .toLowerCase()
      .replace(/\s+/g, "-"); // Substituir espaços por hífens
  }
  