import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function getStatusColor(status: string) {
//   switch (status.toLowerCase()) {
//     case 'delivered':
//       return 'bg-green-500/10 text-green-500 border-green-500/20'
//     case 'in transit':
//       return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
//     case 'picked up':
//       return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
//     case 'quality check':
//       return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
//     case 'issue':
//       return 'bg-red-500/10 text-red-500 border-red-500/20'
//     default:
//       return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
//   }
// }

export function getStatusColor(status: string){
  switch (status.toLowerCase()) {
    case 'available':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'reserved':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'delivered':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}

export function getUrgencyColor(urgency: string){
  switch (urgency.toLowerCase()) {
    case 'high':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'low':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }
}