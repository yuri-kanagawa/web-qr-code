// import { useCallback, useState } form 'react'
// import { useQrcode } form '@/hooks/useQrcode'
// import { zodResolver } form '@hookform/resolvers/zod'
// import { SubmitHandler, useForm } form 'react-hook-form'
// import {
//   RegisterQrCodeContactSchema,
//   registerQrCodeContactSchema
// } form '@/ui/pages/contact/form/validation'
// import { convertContact } form '@/ui/pages/contact/form/utils'
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
