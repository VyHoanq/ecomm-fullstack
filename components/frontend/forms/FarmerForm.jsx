'use client'
import FormHeader from '@/components/form/FormHeader'
import { ImageInput, ToggleInput, ArrayItemInput, TextAreaInput, TextInput } from '@/components/form/FormInput'
import SubmitButton from '@/components/form/SubmitButton'
import { makePostRequest } from '@/lib/apiRequest'
import { generateUseCode } from '@/lib/generateUseCode'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function FarmerForm({ user }) {
  const { register, reset, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      isActive: true,
      ...user
    }
  })
  const isActive = watch("isActive")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const router = useRouter()
  function redirect() {
    router.push('/dashboard/farmers')
  }
  async function onSubmit(data) {
    const code = generateUseCode('LFF', data.name)
    data.code = code
    data.imageUrl = imageUrl
    data.products = products
    data.userId = user.id
    console.log(data)
    makePostRequest(setLoading, 'api/farmers', data, 'Farmer Profile', reset, redirect)
    setImageUrl("")
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-3xl mx-auto p-4 bg-neutral-50  border border-neutral-700 rounded-lg shadow sm:p-6 md:p-8 dark:bg-neutral-700 dark:border-neutral-600 my-3'
    >
      <div className='grid sm:grid-cols-2 gap-4 sm:gap-6'>

        <TextInput label="Farmer's Full Name" name="name" register={register} errors={errors} isRequired={true} />
        <TextInput label="Farmer's Phone Number" name="phone" type='tel' register={register} errors={errors} isRequired={true} className='w-full' />
        <TextInput label="Farmer's Email" name="email" type='email' register={register} errors={errors} isRequired={true} className='w-full' />
        <TextInput label="Farmer's Address" name="address" register={register} errors={errors} isRequired={true} className='w-full' />
        <TextInput label="Farmer's Contact" name="contact" register={register} errors={errors} isRequired={true} className='w-full' />
        <TextInput label="What is the size of your land in accare" name="landSize" type='number' register={register} errors={errors} isRequired={true} className='w-full' />
        <TextInput label="What is your main Crop that you Cultivate" name="mainCrop" type='text' register={register} errors={errors} isRequired={true} className='w-full' />
        <ArrayItemInput setItems={setProducts} items={products} itemTitle="Product" />
        <TextAreaInput label="Farmer's Payment Details" name="payment" register={register} errors={errors} isRequired={true} />
        <ImageInput label="Farmer's Profile" setImageUrl={setImageUrl} imageUrl={imageUrl} endpoint="farmerProfileImage" />
        <TextAreaInput label="Notes" name="notes" register={register} errors={errors} isRequired={false} />
        <ToggleInput label="Publish the Farmer" name="isActive" trueTitle="Active" falseTitle="Draft" register={register} />
      </div>
      <SubmitButton isLoading={loading} buttonTitle='Create Farmer' loadingButtonTitle='Farmer' />
    </form>
  )
}
