export const fetchMockData = async (fileName: string) => {
    try {
      const response = await fetch(`/mock/${fileName}.json`);
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar os dados mockados:", error);
      return null;
    }
  };
  