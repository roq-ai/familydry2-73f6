import axios from 'axios';
import queryString from 'query-string';
import { MemoryInterface, MemoryGetQueryInterface } from 'interfaces/memory';
import { GetQueryInterface } from '../../interfaces';

export const getMemories = async (query?: MemoryGetQueryInterface) => {
  const response = await axios.get(`/api/memories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMemory = async (memory: MemoryInterface) => {
  const response = await axios.post('/api/memories', memory);
  return response.data;
};

export const updateMemoryById = async (id: string, memory: MemoryInterface) => {
  const response = await axios.put(`/api/memories/${id}`, memory);
  return response.data;
};

export const getMemoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/memories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMemoryById = async (id: string) => {
  const response = await axios.delete(`/api/memories/${id}`);
  return response.data;
};
