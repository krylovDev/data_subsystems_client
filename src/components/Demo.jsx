import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, DatePicker } from 'antd';
import {  LockOutlined, CreditCardOutlined, DollarOutlined } from '@ant-design/icons';
import api from '../utils/Api.js'

const Demo = () => {
	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});
	const [isFetching, setIsFetching] = useState(false)
	const monthFormat = 'MM/YYYY';
	
	useEffect(() => {
		forceUpdate({});
	}, []);
	
	const handleDate = (date) => {
		return date.format("DD/MM/YYYY").slice(-7)
	}
	
	const onFinish = ({ExpDate, ...values}) => {
		setIsFetching(true)
		api.addCreditCard({ExpDate: handleDate(ExpDate), ...values})
			.then((res) => console.log("Успешно:", JSON.stringify(res)))
			.catch((error) => console.error("Ошибка:", error));
		setIsFetching(false)
		// form.resetFields()
	};
	
	return (
		<Form
			form={ form }
			name="horizontal_login"
			layout="vertical"
			onFinish={ onFinish }
			className="credit-form"
		>
			
			<Form.Item
				label="Card Number"
				name="CardNumber"
				type="number"
				rules={ [
					{required: true, message: 'Введите номер карты'}, {
						pattern: new RegExp("^[0-9]{16}$"),
						message: 'Введите номер карты в формате цифр, длина 16 символов'
					}] }
			>
				<Input
					placeholder="Card Number"
					prefix={ <CreditCardOutlined className="site-form-item-icon"/> }
				/>
			</Form.Item>
			
			
			<Form.Item
				label="Expiration Date"
				name="ExpDate"
				type="number"
				rules={ [
					{
						required: true,
						message: 'Введите дату'
					},
				] }
			>
				<DatePicker
					format={ monthFormat }
					picker="month"/>
			</Form.Item>
			
			
			<Form.Item
				label="CVV"
				name="Cvv"
				rules={ [
					{
						required: true,
						message: 'Введите CVV-код'
					}, {
						pattern: new RegExp("^[0-9]{3}$"),
						message: 'Введите CVV-код в формате цифр, длина 3 символа',
					}
				] }
			>
				<Input
					prefix={ <LockOutlined className="site-form-item-icon"/> }
					type="password"
					placeholder="123"
				/>
			</Form.Item>
			
			<Form.Item
				label="Amount"
				name="Amount"
				type="number"
				rules={ [
					{
						required: true,
						message: 'Введите сумму оплаты'
					}, {
						pattern: new RegExp("[0-9]"),
						message: 'Введите сумму оплаты в формате цифр',
					}
				] }
			>
				<Input
					placeholder="100"
					prefix={ <DollarOutlined className="site-form-item-icon"/> }
				/>
			</Form.Item>
			
			<Form.Item shouldUpdate>
				{ () => (
					<Button
						type="primary"
						htmlType="submit"
						disabled={
							!form.isFieldsTouched(true) ||
							!!form.getFieldsError().filter(({errors}) => errors.length).length
						}
					>
						{ isFetching ? "Загрузка" : "Оплатить" }
					</Button>
				) }
			</Form.Item>
		</Form>
	);
};

export default Demo
