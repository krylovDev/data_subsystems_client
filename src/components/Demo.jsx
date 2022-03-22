import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Demo = () => {
	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});
	const [isFetching,setIsFetching] = useState(false)
	
	useEffect(() => {
		forceUpdate({});
	}, []);
	
	const onFinish = (values) => {
		setIsFetching(true)
		fetch("http://localhost:5000", {
			method: 'post',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(values)
		})
			.then((res) => res.json())
			.then((res) => {
				setIsFetching(false)
				console.log("Успешно:", JSON.stringify(res))
			})
			.catch((error) => console.error("Ошибка:", error));
		form.resetFields()
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
					prefix={ <UserOutlined className="site-form-item-icon"/> }
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
					}, {
						pattern: new RegExp("^(0[1-9]|10|11|12)/20[2-9]{2}$"),
						message: 'Введите дату в формате MM/YYYY',
					}
				] }
			>
				<Input
					placeholder="12/2025"
					prefix={ <UserOutlined className="site-form-item-icon"/> }
				/>
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
					prefix={ <UserOutlined className="site-form-item-icon"/> }
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
						{isFetching ? "Загрузка" : "Оплатить" }
					</Button>
				) }
			</Form.Item>
		</Form>
	);
};

export default Demo
