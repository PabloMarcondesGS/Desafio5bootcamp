import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

// eslint-disable-next-line consistent-return
transactionRouter.get('/', (request, response) => {
  try {
    const transaction = transactionsRepository.all();

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
