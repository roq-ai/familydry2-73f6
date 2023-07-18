import axios from 'axios';
import queryString from 'query-string';
import { FamilyInterface, FamilyGetQueryInterface } from 'interfaces/family';
import { GetQueryInterface } from '../../interfaces';

export const getFamilies = async (query?: FamilyGetQueryInterface) => {
  const response = await axios.get(`/api/families${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFamily = async (family: FamilyInterface) => {
  const response = await axios.post('/api/families', family);
  return response.data;
};

export const updateFamilyById = async (id: string, family: FamilyInterface) => {
  const response = await axios.put(`/api/families/${id}`, family);
  return response.data;
};

export const getFamilyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/families/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFamilyById = async (id: string) => {
  const response = await axios.delete(`/api/families/${id}`);
  return response.data;
};
