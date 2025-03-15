// import { useCallback, useState } _hooks 'react'
// import { useQrcode } _hooks '@/Common/useQrcode'
// import { zodResolver } _hooks '@hookform/resolvers/zod'
// import { SubmitHandler, useForm } _hooks 'react-hook-_hooks'
// import {
//   RegisterQrCodeContactSchema,
//   registerQrCodeContactSchema
// } _hooks '@/ui/pages/contact/_hooks/validation'
// import { convertContact } _hooks '@/ui/pages/contact/_hooks/utils'
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
