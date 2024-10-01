import { ICapivara } from "../../providers/@types";
import { useForm } from "react-hook-form";
import "./CapivaraForm.css";

interface CapivaraFormProps {
  onSubmit: (capivara: Omit<ICapivara, "id">) => Promise<void>;
  capivara: ICapivara | null;
  setCapivara: React.Dispatch<React.SetStateAction<ICapivara | null>>;
  fetchCapivaras: () => Promise<void>;
}

const CapivaraForm: React.FC<CapivaraFormProps> = ({
  onSubmit,
  capivara,
  setCapivara,
  fetchCapivaras,
}) => {
  const { register, handleSubmit, reset } = useForm<Omit<ICapivara, "id">>({
    defaultValues: capivara ? { ...capivara } : {},
  });

  const onFormSubmit = async (data: Omit<ICapivara, "id">) => {
    await onSubmit(data);
    reset();
    setCapivara(null);
    fetchCapivaras();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input {...register("nome", { required: true })} placeholder="Nome" />
        <input
          {...register("idade", { required: true })}
          type="number"
          placeholder="Idade"
        />
        <input
          {...register("peso", { required: true })}
          type="number"
          placeholder="Peso"
        />
        <input
          {...register("habitat", { required: true })}
          placeholder="Habitat"
        />
        <select {...register("statusSaude", { required: true })}>
          <option value="" disabled>
            Status de Saúde
          </option>
          {[
            "Saudável",
            "Necessita de cuidados",
            "Doente",
            "Em recuperação",
            "Ferido",
            "Em observação",
            "Grávida",
            "Recém-nascido",
          ].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          {...register("comportamento", { required: true })}
          placeholder="Comportamento"
        />
        <input {...register("dieta", { required: true })} placeholder="Dieta" />
        <textarea {...register("observacoes")} placeholder="Observações" />
        <button type="submit">
          {capivara ? "Atualizar Capivara" : "Adicionar Capivara"}
        </button>
      </form>
    </div>
  );
};

export default CapivaraForm;
