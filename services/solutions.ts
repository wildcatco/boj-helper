import axios from 'axios';

import {
  CreateSolutionBody,
  CreateSolutionResponse,
} from '@/types/dto/solutions/create-solution';
import { DeleteSolutionResponse } from '@/types/dto/solutions/delete-solution';

export const createOrUpdateSolution = async ({
  categoryName,
  difficulty,
  code,
  language,
  revisit,
  problemId,
}: CreateSolutionBody) => {
  try {
    const response = await axios.post<CreateSolutionResponse>(
      '/api/solutions',
      {
        categoryName,
        difficulty,
        code,
        language,
        revisit,
        problemId,
      }
    );

    return {
      solution: response.data.solution,
      error: null,
    };
  } catch (error) {
    console.error(error);

    return {
      solution: null,
      error,
    };
  }
};

export const deleteSolution = async (id: string) => {
  try {
    await axios.delete<DeleteSolutionResponse>(`/api/solutions/${id}`);

    return {
      error: null,
    };
  } catch (error) {
    console.error(error);

    return {
      error,
    };
  }
};
