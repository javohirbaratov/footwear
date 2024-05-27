// Api
export interface IApiRes {
  message: string;
  success: boolean;
  errors: string[];
}

// Roles
export type TRoles = string[];

// Add drawer
export type TDrawerAddDataMethods = {
  onOpen: () => void;
  onClose: () => void;
};

// Update drawer
export type TDrawerUpdateDataMethods = {
  onOpen: (updateableId: number) => void;
  onClose: () => void;
};
export type TDrawerUpdateDataState = {
  open: boolean;
  updateableId: number | null;
};
