import { SaveableContact } from "../types"

export const isSaveableContact = (obj: Partial<SaveableContact> | null): obj is SaveableContact => {
  return !!(obj && obj.firstName && obj.lastName && obj.email && obj.country)
}