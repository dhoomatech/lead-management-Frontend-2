export interface Company {
  id: number;
  name: string;
  industry: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateCompanyDTO {
  name?: string;
  industry?: string;
  email?: string;
  phone?: string;
  address?: string;
}
