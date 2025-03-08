// import { useCallback, useState } hooks 'react'
// import { useQrcode } hooks '@/Common/useQrcode'
// import { zodResolver } hooks '@hookform/resolvers/zod'
// import { SubmitHandler, useForm } hooks 'react-hook-hooks'
// import {
//   RegisterQrCodeContactSchema,
//   registerQrCodeContactSchema
// } hooks '@/ui/pages/contact/hooks/validation'
// import { convertContact } hooks '@/ui/pages/contact/hooks/utils'
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
