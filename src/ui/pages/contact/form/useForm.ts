// import { useCallback, useState } from 'react'
// import { useQrcode } from '@/hooks/useQrcode'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import {
//   RegisterQrCodeContactSchema,
//   registerQrCodeContactSchema
// } from '@/ui/pages/contact/form/validation'
// import { convertContact } from '@/ui/pages/contact/form/utils'
// export const useQRCodeContactForm = () => {
//   const { qrValue, setQrValue } = useQrcode()
//   const { control, handleSubmit, ...other } = useForm({
//     resolver: zodResolver(registerQrCodeContactSchema),
//     mode: 'onChange',
//     defaultValues: {
//       fullName: '',
//       firstName: '',
//       lastName: '',
//       phoneNumber: '',
//       organization: '',
//       post: '',
//       businessCellularTelephone: '',
//       privateCellularTelephone: '',
//       email: '',
//       address: '',
//       url: ''
//     }
//   })
//
//   const submitHandler: SubmitHandler<RegisterQrCodeContactSchema> = useCallback(
//     async (data) => {
//       console.log('fnfoawfoaw')
//
//       setQrValue({ value: convertContact(data) })
//     },
//     [setQrValue]
//   )
//
//   return {
//     qrValue,
//     control,
//     onSubmit: handleSubmit(submitHandler),
//     ...other
//   }
// }
